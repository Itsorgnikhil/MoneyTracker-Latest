package beingcoder.moneymanager.service;


import beingcoder.moneymanager.dto.ExpenseDTO;
import beingcoder.moneymanager.dto.IncomeDTO;
import beingcoder.moneymanager.entity.CategoryEntity;

import beingcoder.moneymanager.entity.ExpenseEntity;
import beingcoder.moneymanager.entity.IncomeEntity;
import beingcoder.moneymanager.entity.ProfileEntity;
import beingcoder.moneymanager.repository.CategoryRepository;
import beingcoder.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO dto) {
        // get current profile
        ProfileEntity profile = profileService.getCurrentProfile();
        // find category
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        // convert DTO -> Entity
        IncomeEntity newExpense = toEntity(dto, profile, category);
        // save entity
        newExpense = incomeRepository.save(newExpense);
        // convert Entity -> DTO
        return toDTO(newExpense);
    }


    // retrieves all income for the current month on the start data and end date
    public List<IncomeDTO> getCurrentMonthIncomesForCurrentUser() {
        // Get the currently logged-in user's profile
        ProfileEntity profile = profileService.getCurrentProfile();
        // Get the first and last day of the current month
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        // Fetch expenses for the current profile between start and end dates
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetween(
                profile.getId(),
                startDate,
                endDate
        );

        // Convert entities to DTOs and return
        return list.stream().map(this::toDTO)
                .toList();
    }

    // Delete an income by its ID for the current user
    public void deleteIncome(Long incomeId) {
        // Get the currently logged-in user's profile
        ProfileEntity profile = profileService.getCurrentProfile();

        // Fetch the expense by ID or throw exception if not found
        IncomeEntity entity = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new RuntimeException("Income not found"));

        // Check if the expense belongs to the current user
        if (!entity.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this income");
        }

        // Delete the expense
        incomeRepository.delete(entity);
    }
    // Get latest 5 incomes for current user
    public List<IncomeDTO> getLatest5IncomesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());

        return list.stream()
                .map(this::toDTO)
                .toList();
    }

    // Get total incomes for current user
    public BigDecimal getTotalIncomeForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = incomeRepository.findTotalIncomeProfileId(profile.getId());
        return total != null ? total : BigDecimal.ZERO;
    }

  //  filter incomes
    public List<IncomeDTO> FilterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
                profile.getId(),
                startDate,
                endDate,
                keyword,
                sort
        );
        return list.stream().map(this::toDTO).toList();
    }




    //helper methods
    // Convert DTO → Entity
    private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category) {
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    // Convert Entity → DTO
    private IncomeDTO toDTO(IncomeEntity entity) {
        return IncomeDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }


}
