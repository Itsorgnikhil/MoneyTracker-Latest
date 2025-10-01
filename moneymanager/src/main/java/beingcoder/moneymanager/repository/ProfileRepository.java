package beingcoder.moneymanager.repository;

import beingcoder.moneymanager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {
 // jpa is going to execute the sql query
    Optional<ProfileEntity> findByEmail(String email);

    Optional<ProfileEntity>findByActivationToken(String activationToken);
}
