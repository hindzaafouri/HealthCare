package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Entities.Topic;
import tn.esprit.healthcare.Repositories.ThreadRepository;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ThreadService implements IThreadService {

    @Autowired
    ThreadRepository threadRepository ;

    @Override
    public void addUpdateThread(Thread thread) {
        threadRepository.save(thread) ;
    }

    @Override
    public void deleteThread(Thread thread) {
        threadRepository.delete(thread);
    }

    @Override
    public Set<Thread> findThreadByTopic(Topic topic) {
        List<Thread> listThread = (List)threadRepository.findAll();
        Set<Thread> listThreadByTopic = new HashSet<>() ;

        for (Thread thread : listThread) {
            Topic topicFromThread = thread.getTopicThread();
            if(topicFromThread == topic) {
                listThreadByTopic.add(thread) ;
            }
        }
        return listThreadByTopic ;
    }

    @Override
    public Thread findThreadById(Long id) {
        return threadRepository.findById(id).get() ;
    }

    @Override
    public Iterable<Thread> findAll() {
        return threadRepository.findAll();
    }

    @Override
    public void upThread(Long id) {
        Thread thread = threadRepository.findById(id).get() ;
        int votes = thread.getVotes() ;
        votes++ ;
        thread.setVotes(votes);
        threadRepository.save(thread) ;
    }

    @Override
    public void downThread(Long id) {
        Thread thread = threadRepository.findById(id).get() ;
        int votes = thread.getVotes() ;
        votes-- ;
        thread.setVotes(votes);
        threadRepository.save(thread) ;
    }

    @Override
    public Set<Thread> findThreadByKeyWord (String keyword) {
        Iterable<Thread> allThreads = threadRepository.findAll();
        Set<Thread> matchingThreads = new HashSet<>();

        for (Thread thread : allThreads) {
            String title = thread.getTitleThread().toLowerCase();
            String question = thread.getQuestionThread().toLowerCase();
            keyword = keyword.toLowerCase() ;
            if (title.contains(keyword) || question.contains(keyword)) {
                matchingThreads.add(thread);
            }
        }
        return matchingThreads;
    }




}