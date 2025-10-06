package beingcoder.moneymanager.controller;

import beingcoder.moneymanager.dto.AuthDTO;
import beingcoder.moneymanager.dto.ProfileDTO;
import beingcoder.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0") // Optional base path
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO){
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            // Check if account is active (should be true by default now)
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                        "message", "Account is not active."
                ));
            }

            // Authenticate and get user info
            Map<String, Object> response = profileService.login(authDTO);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "message", e.getMessage()
            ));
        }
    }

    // Get public profile
    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile(@RequestParam(required = false) String email){
        ProfileDTO profileDTO = profileService.getPublicProfile(email);
        return ResponseEntity.ok(profileDTO);
    }
}
