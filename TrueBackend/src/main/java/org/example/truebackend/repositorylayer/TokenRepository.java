package org.example.truebackend.repositorylayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.example.truebackend.Models.TokenEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<TokenEntity, Integer> {

    // This is a custom query that selects all TokenEntity objects (t) that are associated with a specific User (u) where the User's id matches the provided id and the TokenEntity is not expired (t.expired = false) and not revoked (t.revoked = false). The :id is a placeholder that gets replaced with the actual id value when the query is executed. This query is used in the findAllValidTokenByUser(Integer id) method to fetch all valid tokens for a specific user.
    Optional<TokenEntity> findByToken(String token);

    @Query(value = """
                        select t from TokenEntity t 
                        inner join User u on t.user.id = u.id 
                        where u.id = :id 
                        and t.expired = false 
                        and t.revoked = false
                    """)
    List<TokenEntity> findAllValidTokenByUser(Integer id);



    List<TokenEntity> findTokenEntitiesByConfirmationToken(String confirmationToken);

    List<TokenEntity> findTokenEntitiesByRefreshToken(String token);
}
