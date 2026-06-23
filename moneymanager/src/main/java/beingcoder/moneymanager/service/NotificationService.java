package beingcoder.moneymanager.service;

import beingcoder.moneymanager.dto.ExpenseDTO;
import beingcoder.moneymanager.entity.ProfileEntity;
import beingcoder.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

//@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

@Value("${money.manager.frontend.url}")
    private String frontendUrl;


@Scheduled(cron = "0 0 22 * * *",zone = "IST")
public void sendDailyIncomeExpenseReminder(){
     log.info("job started:sendDailyIncomeExpenseReminder");
     List<ProfileEntity> profiles = profileRepository.findAll();
    for (ProfileEntity profile : profiles) {
        String body = "Hi " + profile.getFullName() + ",<br><br>"
                + "This is a friendly reminder to add your income and expenses for today in Money Manager.<br>"
                + "<a href=\"" + frontendUrl + "\" style='display:inline-block;padding: 10px 20px; background-color:#4CAF50; color:white; text-decoration:none;'>Go to Money Manager</a>"
                + "<br><br>Best regards,<br>Money Manager Team";

        emailService.sendEmail(profile.getEmail(), "Daily reminder: Add your income and expenses", body);
    }
}
    //@Scheduled(cron="0 * * * * *",zone = "IST")
@Scheduled(cron="0 0 23 * * *",zone = "IST")
public void sendDailyExpenseSummary() {
    log.info("Job started: sendDailyExpenseSummary()");

    List<ProfileEntity> profiles = profileRepository.findAll();

    for (ProfileEntity profile : profiles) {
        List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());

        if (!todaysExpenses.isEmpty()) {
            StringBuilder table = new StringBuilder();

            table.append("<table style='border-collapse:collapse; width:100%; font-family:Arial, sans-serif; font-size:14px; box-shadow:0 2px 8px rgba(0,0,0,0.1);'>");
            table.append("<thead style='background-color:#4CAF50; color:white;'>")
                    .append("<tr>")
                    .append("<th style='border:1px solid #ddd; padding:10px; text-align:left;'>#</th>")
                    .append("<th style='border:1px solid #ddd; padding:10px; text-align:left;'>Name</th>")
                    .append("<th style='border:1px solid #ddd; padding:10px; text-align:left;'>Amount</th>")
                    .append("<th style='border:1px solid #ddd; padding:10px; text-align:left;'>Category</th>")
                    .append("</tr>")
                    .append("</thead>");

            table.append("<tbody>");

            int i = 1;
            for (ExpenseDTO expense : todaysExpenses) {
                String rowColor = (i % 2 == 0) ? "#f9f9f9" : "#ffffff"; // alternate row colors
                table.append("<tr style='background-color:").append(rowColor).append(";'>")
                        .append("<td style='border:1px solid #ddd; padding:10px;'>").append(i++).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:10px;'>").append(expense.getName()).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:10px; color:#e67e22; font-weight:bold;'>₹")
                        .append(expense.getAmount()).append("</td>")
                        .append("<td style='border:1px solid #ddd; padding:10px;'>").append(expense.getCategoryId()).append("</td>")
                        .append("</tr>");
            }

            table.append("</tbody>");
            table.append("</table>");


            String body = "Hi " + profile.getFullName() + ",<br/><br/>"
                    + "Here is a summary of your expenses for today:<br/><br/>"
                    + table.toString()
                    + "<br/>Regards,<br/>Money Manager App";

            emailService.sendEmail(profile.getEmail(), "Your Daily Expense Summary", body);
        }
    }
    log.info("Job completed: sendDailyExpenseSummary();");
}


}
