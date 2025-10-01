package beingcoder.moneymanager.repository;

import beingcoder.moneymanager.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    // select * from tbl_incomes where profile_id = ? order by date desc
    List<IncomeEntity> findByProfile_IdOrderByDateDesc(Long profileId);

    // select * from tbl_incomes where profile_id = ? order by date desc
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    // select sum(amount) from tbl_incomes where profile_id = ?
    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id = :profileId")
    BigDecimal findTotalIncomeProfileId(@Param("profileId") Long profileId);

    // select * from tbl_incomes
    // where profile_id = ? and date between ? and ? and name like %?% order by ...
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // select * from tbl_incomes where profile_id = ? and date between ? and ?
    List<IncomeEntity> findByProfileIdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);
}
