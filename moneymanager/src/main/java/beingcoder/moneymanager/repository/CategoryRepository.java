package beingcoder.moneymanager.repository;

import beingcoder.moneymanager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    // SELECT * FROM tbl_categories WHERE profile_id = ?
    List<CategoryEntity> findByProfileId(Long profileId);

    // SELECT * FROM tbl_categories WHERE id = ? AND profile_id = ?
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

    // SELECT * FROM tbl_categories WHERE type = ? AND profile_id = ?
    List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);

    // SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END
    // FROM tbl_categories WHERE name = ? AND profile_id = ?
    Boolean existsByNameAndProfileId(String name, Long profileId);
}
