package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.healthcare.Entities.Answer;
import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Entities.Topic;
import tn.esprit.healthcare.Repositories.ThreadRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ThreadService implements IThreadService {

    @Autowired
    ThreadRepository threadRepository ;

    @Override
    public void addUpdateThread(Thread thread) {
        thread.setCreatedAt(LocalDateTime.now());
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
    public List<String> getTopics() {
            List<String> topics = Arrays.stream(Topic.values())
                    .map(Topic::name)
                    .collect(Collectors.toList());
            return topics ;
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

    @Override
    public List<Thread> getThreadsSortedByVotes() {
        Iterable<Thread> optionalThread = threadRepository.findAll();
        List<Thread> threads = StreamSupport.stream(optionalThread.spliterator(), false).collect(Collectors.toList());
            threads.sort(Comparator.comparingInt(Thread::getVotes).reversed());
        threads = threads.subList(0, 3) ;
            return threads;
        }
    }


