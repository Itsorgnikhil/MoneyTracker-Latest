package beingcoder.moneymanager.controller;

import beingcoder.moneymanager.dto.AuthDTO;
import beingcoder.moneymanager.dto.ProfileDTO;
import beingcoder.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")//handler method
     public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO){
         ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);

     }
@GetMapping("/activate")
    public ResponseEntity<String> antivoteProfile(@RequestParam String token) {
        boolean isActivated = profileService.activateProfile(token);

        if (isActivated) {
            return ResponseEntity.ok("Profile activated successfully");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Activation token not found or already used");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            // Check if the account is active
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                        "message", "Account is not active. Please activate your account first."
                ));
            }

            // Authenticate user and generate token
            Map<String, Object> response = profileService.authenticateAndGenerateToken(authDTO);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "message", e.getMessage()
            ));
        }

    }


}
