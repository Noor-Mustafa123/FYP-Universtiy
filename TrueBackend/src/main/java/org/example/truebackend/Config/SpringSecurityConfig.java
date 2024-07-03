//package org.example.truebackend.Config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//
//public class SpringSecurityConfig {
////  The @Autowired annotation on the configureGlobal method is used to automatically inject an instance of AuthenticationManagerBuilder when the method is called
////  the securityFilterChain method is annotated with @Bean. This means that the method will produce a bean to be managed by the Spring container.
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//    http
//            .authorizeHttpRequests()
//            .anyRequest()
//            .authenticated()
//            .and()
//            .httpBasic();
//
//    }
//}



