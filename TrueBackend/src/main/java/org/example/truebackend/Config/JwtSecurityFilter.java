package org.example.truebackend.Config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.example.truebackend.Models.TokenEntity;
import org.example.truebackend.Models.User;
import org.example.truebackend.Services.JwtTokenService;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;

@Configuration
public class JwtSecurityFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenService jwtService;
    @Autowired
    UserDetailsService userDetailsService;

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/UserData/webhook",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/UserData/resetPassword"
    };
    @Autowired
    private AntPathMatcher pathMatcher;

    @Override
//    TODO: -->
//   * the transactional annotation wont work because it only works on spring managed beans and this filter is not so i need to move the transactional functionality into a service layer
//   ? Check the error comment on the userRepo method call in the method to see the reason for this annotation

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {




        final var jwtToken = request.getHeader("Authorization");
////     check for the token presence and type

        if (jwtToken == null || !jwtToken.contains("Bearer")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized-Missing jwt Token");
            System.out.println("the program is hitting here");
            return;
        }

//      get the email from the body of the jwt token and check it in the database
        String jwt = jwtToken.substring(7);
        Claims claims = jwtService.getAllClaims(jwt);
        String email = jwtService.extractUsername(jwt);
        User user = jwtService.getUserFromDatabase(jwt);


//        CHECK WITH TIME IF THE TOKEN IS EXPIRED
        if(jwtService.isTokenExpired(claims)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized-Missing jwt Token");
            System.out.println("the token exp is overdue and expired");
            return;
        }

//  ! Here, you're trying to access the tokens collection of a User entity outside of a transactional context. When the user.getTokens() method is called, Hibernate tries to fetch the tokens collection from the database. However, because the Hibernate Session has already been closed (as the findByEmail method has completed), it can't fetch the collection, resulting in the LazyInitializationException.

        TokenEntity tokenObj = jwtService.getTokenObjFromUserObj(jwt);
        if(tokenObj==null){
            System.out.println("No matching/active token in the database");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("No matching/active token in the database");
            return;
        }

        String token = tokenObj.getToken();



//  ! add a revoked or expired check to not get the expired token from the database



        if (Objects.equals(token, jwt)) {

            System.out.println("The token matched successfully");


//  In the context of your JwtAuthenticationFilter, you're dealing with authentication, which is a concern of Spring Security. Therefore, you use UserDetailsService to integrate with Spring Security's authentication mechanism.

            if (SecurityContextHolder.getContext().getAuthentication() == null && email != null) {

                if (!tokenObj.isRevoked() && !tokenObj.isExpired()) {
//                    UserDetails userDetails = new UserPrincipal(user);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);


//    In this specific part of your code, you are not performing the authentication process again. Instead, you are using the UserDetailsService to load the UserDetails for the user, and then creating a UsernamePasswordAuthenticationToken with these details. This token is then set in the SecurityContextHolder.  The reason you don't need to authenticate the user again here is because this code is part of a filter that processes incoming requests. At this point in the code, you have already verified the JWT token and confirmed that it is valid and corresponds to a valid user. Therefore, you can assume that the user is authenticated.
                    System.out.println(userDetails.toString());
                    System.out.println(userDetails.getAuthorities());
//   The UsernamePasswordAuthenticationToken is then used to set the Authentication in the SecurityContextHolder, which makes the user's authentication details available throughout your application for the duration of the request.
                    UsernamePasswordAuthenticationToken authenticationObj = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    authenticationObj.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationObj);
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    String currentPrincipalName = authentication.getName();
                    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

                    System.out.println("Current principal name: " + currentPrincipalName);
                    System.out.println("Current principal authorities: " + authorities);
                    System.out.println("added to security context");

                    filterChain.doFilter(request, response);
                } else {
                    System.out.println("token is expired or revoked");
                }
            } else {
                System.out.println("the email is null or the application context is null");
            }
        }
       else {
            System.out.println("Token does not match");
        }

    }


//doing this because webConfiguration does not work on custom filters so we are overriding this method which makes the filter ignore specific paths
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
      String path = request.getServletPath();
      return Arrays.stream(WHITE_LIST_URL).anyMatch(pattern-> pathMatcher.match(pattern,path));
    }

}
