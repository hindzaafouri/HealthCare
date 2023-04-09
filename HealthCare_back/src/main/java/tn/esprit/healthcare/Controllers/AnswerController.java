package tn.esprit.healthcare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.healthcare.Entities.Answer;
import tn.esprit.healthcare.Services.IAnswerService;

import java.util.List;

@RestController
@RequestMapping("/answer-op")
@CrossOrigin(origins = "http://localhost:4200")
public class AnswerController {
    @Autowired
    IAnswerService answerService ;

    @PostMapping("/add-answer/{idThread}")
    public ResponseEntity<Void> addAnswerAndAssignToThread (@RequestBody Answer answer , @PathVariable Long idThread) {
           answerService.addAnswerAndAssignToThread(answer,idThread);
           return ResponseEntity.status(HttpStatus.CREATED).build() ;
    }

    @DeleteMapping("/delete-answer/{idAnswer}")
    public void deleteAnswer (@PathVariable Long idAnswer) {
        Answer answer = answerService.findAnswerById(idAnswer) ;
        answerService.deleteAnswer(answer);
    }

    @GetMapping("/{idAnswer}/{idThread}")
    public ResponseEntity<?> findAnswerByIdForThread(@PathVariable  Long idAnswer, @PathVariable Long idThread) {
        try {
            Answer result = answerService.findAnswerByIdForThread(idAnswer, idThread);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }

    }

    @GetMapping("/sortedByVotes/{idThread}")
    public ResponseEntity<?> getAnswersSortedByVotes (@PathVariable Long idThread) {
        try {
            List<Answer> sortedAnswers = answerService.getAnswersSortedByVotes(idThread);
            return ResponseEntity.ok(sortedAnswers);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }



}
