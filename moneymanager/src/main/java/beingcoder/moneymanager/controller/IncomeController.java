package beingcoder.moneymanager.controller;

import beingcoder.moneymanager.dto.ExpenseDTO;
import beingcoder.moneymanager.dto.IncomeDTO;
import beingcoder.moneymanager.service.ExpenseService;
import beingcoder.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto) {
        IncomeDTO saved =incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes() {
        // Call service method to get expenses for current user
        List<IncomeDTO> expenses = incomeService.getCurrentMonthIncomesForCurrentUser();

        // Return as ResponseEntity
        return ResponseEntity.ok(expenses);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build(); // HTTP 204
    }
}
