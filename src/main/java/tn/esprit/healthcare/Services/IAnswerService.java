package tn.esprit.healthcare.Services;

import tn.esprit.healthcare.Entities.Answer;

import java.util.List;

public interface IAnswerService {

    public void addAnswerAndAssignToThread (Answer answer , Long idThread) ;
    public void deleteAnswer (Answer answer) ;

    public Answer findAnswerByIdForThread (Long idAnswer , Long idThread) ;

    public Answer findAnswerById (Long idAnswer) ;
    public List<Answer> getAnswersSortedByVotes (Long idThread) ;


}
