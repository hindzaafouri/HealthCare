package tn.esprit.healthcare.Services;

import tn.esprit.healthcare.Entities.Answer;
import tn.esprit.healthcare.Entities.Thread;

import java.util.List;
import java.util.Set;

public interface IAnswerService {

    public void addAnswerAndAssignToThread (Answer answer , Long idThread) ;
    public void deleteAnswer (Answer answer) ;

    public void updateAnswer (Answer answer) ;

    public Answer findAnswerById (Long idAnswer) ;
    public List<Answer> getAnswersSortedByVotes (Long idThread) ;

    public Set<Answer> findAnswersByThreadOrderByCreatedAt (Thread thread) ;

}
