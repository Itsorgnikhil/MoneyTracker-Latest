package beingcoder.moneymanager.service;

import beingcoder.moneymanager.dto.ExpenseDTO;
import beingcoder.moneymanager.entity.CategoryEntity;
import beingcoder.moneymanager.entity.ExpenseEntity;
import beingcoder.moneymanager.entity.ProfileEntity;
import beingcoder.moneymanager.repository.CategoryRepository;
import beingcoder.moneymanager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository  expenseRepository;
private final ProfileService profileService;

// adds a new expense to the database
public ExpenseDTO addExpense(ExpenseDTO dto) {
    // get current profile
    ProfileEntity profile = profileService.getCurrentProfile();
    // find category
    CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));
    // convert DTO -> Entity
    ExpenseEntity newExpense = toEntity(dto, profile, category);
    // save entity
    newExpense = expenseRepository.save(newExpense);
    // convert Entity -> DTO
    return toDTO(newExpense);
}
// retrieves all expenses for the current month on the start data and end date

    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser() {
        // Get the currently logged-in user's profile
        ProfileEntity profile = profileService.getCurrentProfile();
        // Get the first and last day of the current month
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        // Fetch expenses for the current profile between start and end dates
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(
                profile.getId(),
                startDate,
                endDate
        );

        // Convert entities to DTOs and return
        return list.stream().map(this::toDTO)
                .toList();
    }


    // Delete an expense by its ID for the current user
    public void deleteExpense(Long expenseId) {
        // Get the currently logged-in user's profile
        ProfileEntity profile = profileService.getCurrentProfile();

        // Fetch the expense by ID or throw exception if not found
        ExpenseEntity entity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check if the expense belongs to the current user
        if (!entity.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }

        // Delete the expense
        expenseRepository.delete(entity);
    }

    // Get latest 5 expenses for current user
    public List<ExpenseDTO> getLatest5ExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return list.stream()
                .map(this::toDTO)
                .toList();
    }

    // get total expenses for current user
    public BigDecimal getTotalExpenseForCurrentUser(){
    ProfileEntity profile = profileService.getCurrentProfile();
    BigDecimal total = expenseRepository.findTotalExpenseProfileId(profile.getId());
    return total !=null?total:BigDecimal.ZERO;
    }
// filter expences
public List<ExpenseDTO> FilterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
    ProfileEntity profile = profileService.getCurrentProfile();
    List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            profile.getId(),
            startDate,
            endDate,
            keyword,
            sort
    );
    return list.stream().map(this::toDTO).toList();
}
// notifications
public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId, LocalDate date) {
    List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);
    return list.stream().map(this::toDTO).toList();
}


    // helper methods
    // Convert DTO → Entity
    private ExpenseEntity toEntity(ExpenseDTO dto, ProfileEntity profile, CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    // Convert Entity → DTO
    private ExpenseDTO toDTO(ExpenseEntity entity) {
        return ExpenseDTO.builder()
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
