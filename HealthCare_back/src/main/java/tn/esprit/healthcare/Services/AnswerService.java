package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.healthcare.Entities.Answer;
import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Repositories.AnswerRepository;
import tn.esprit.healthcare.Repositories.ThreadRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AnswerService implements IAnswerService{

    @Autowired
    ThreadRepository threadRepository ;

    @Autowired
    AnswerRepository answerRepository ;
    @Override
    public void addAnswerAndAssignToThread(Answer answer, Long idThread) {
        Optional<Thread> optionalThread = threadRepository.findById(idThread);
        if (optionalThread.isPresent()) {
            Thread thread = optionalThread.get();
            Set<Answer> answers = thread.getAnswers();
            if (answers == null) {
                answers = new HashSet<>();
            }
            answers.add(answer);
            thread.setAnswers(answers);
            answer.setThread(thread);
            answer.setCreatedAt(LocalDateTime.now());
            answerRepository.save(answer);
            threadRepository.save(thread);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Thread not found");
        }
    }

    @Override
    public void deleteAnswer(Answer answer) {
        answerRepository.delete(answer);
    }


    /*@Override
    public Answer findAnswerByIdForThread(Long idAnswer, Long idThread) {
        Optional<Thread> optionalThread = threadRepository.findById(idThread);
        if (optionalThread.isPresent()) {
            Thread thread = optionalThread.get();
            Set<Answer> answers = thread.getAnswers() ;
            for ( Answer answer : answers) {
                if (answer.getIdAnswer() == idAnswer)
                    return answer ;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Thread not found");
    }*/

    @Override
    public Answer findAnswerById(Long idAnswer) {
        return answerRepository.findById(idAnswer).get() ;
    }

    @Override
    public List<Answer> getAnswersSortedByVotes(Long idThread) {
        Optional<Thread> optionalThread = threadRepository.findById(idThread);
        if (optionalThread.isPresent()) {
            Thread thread = optionalThread.get();
            List<Answer> answers = new ArrayList<>(thread.getAnswers());
            answers.sort(Comparator.comparingInt(Answer::getVotes).reversed());
            return answers;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Thread not found");
        }
    }

    @Override
    public Set<Answer> findAnswersByThreadOrderByCreatedAt(Thread thread) {
        return answerRepository.findAnswersByThreadOrderByCreatedAt(thread) ;
    }


}
