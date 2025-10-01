package beingcoder.moneymanager.service;

import beingcoder.moneymanager.dto.CategoryDTO;
import beingcoder.moneymanager.entity.CategoryEntity;
import beingcoder.moneymanager.entity.ProfileEntity;
import beingcoder.moneymanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

// save category


    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        // Get current profile (assuming profileService provides it)
        ProfileEntity profile = profileService.getCurrentProfile();

        // Check if category with same name already exists for this profile
        if (categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), profile.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category with this name already exists");
        }

        // Convert DTO to entity
        CategoryEntity newCategory = toEntity(categoryDTO, profile);

        // Save entity
        newCategory = categoryRepository.save(newCategory);

        // Convert back to DTO and return
        return toDTO(newCategory);
    }
    //get categories for current user
    public List<CategoryDTO> getCategoriesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
        return categories.stream().map(this::toDTO).toList();
    }
    //get categories from type  for the user
    public List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type) {
        // Get current user's profile
        ProfileEntity profile = profileService.getCurrentProfile();

        // Fetch categories by type for this profile
        List<CategoryEntity> entities = categoryRepository.findByTypeAndProfileId(type, profile.getId());

        // Convert entities to DTOs
        return entities.stream()
                .map(this::toDTO)
                .toList();
    }

    public CategoryDTO updateCategory(Long categoryId, CategoryDTO dto) {
        ProfileEntity profile = profileService.getCurrentProfile();

        CategoryEntity existingCategory = categoryRepository
                .findByIdAndProfileId(categoryId, profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or not accessible"));

        existingCategory.setName(dto.getName());
        existingCategory.setIcon(dto.getIcon());

        existingCategory = categoryRepository.save(existingCategory);

        return toDTO(existingCategory);
    }


    // helper methods
    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile) {
        return CategoryEntity.builder()
                .name(categoryDTO.getName())
                .icon(categoryDTO.getIcon())
                .profile(profile)
                .type(categoryDTO.getType())
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity entity) {
        return CategoryDTO.builder()
                .id(entity.getId())
                .profileId(entity.getProfile() != null ? entity.getProfile().getId() : null)
                .name(entity.getName())
                .icon(entity.getIcon())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())   // ✅ fixed typo
                .type(entity.getType())
                .build();
    }

}
