package tn.esprit.healthcare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.healthcare.Entities.Answer;
import tn.esprit.healthcare.Entities.Thread;
import tn.esprit.healthcare.Entities.Topic;
import tn.esprit.healthcare.Repositories.ThreadRepository;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ThreadService implements IThreadService {

    @Autowired
    ThreadRepository threadRepository ;

   @Override
    public Thread addThread(Thread thread) {
        thread.setCreatedAt(LocalDateTime.now());
        threadRepository.save(thread) ;
        return thread ;
    }

    /*@Override
    public void addThread(Thread thread, MultipartFile file) throws IOException {
        thread.setCreatedAt(LocalDateTime.now());

        // Save the cover photo to the local file system
        if (!file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            String uploadDir = "uploads/";
            String filePath = uploadDir + fileName;

            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdir();
            }

            File dest = new File(filePath);
            file.transferTo(dest);

            thread.setCoverPhotoThread(filePath);
            thread.setCreatedAt(LocalDateTime.now());
        }

        threadRepository.save(thread);
    }*/



    @Override
    public void updateThread(Thread updatedThread) {
        // Check if the answer already exists in the database
        Optional<Thread> threadOptional = threadRepository.findById(updatedThread.getIdThread());
        if (threadOptional.isPresent()) {
            Thread thread = threadOptional.get();
            // Update the answer fields

            thread.setStatus(updatedThread.isStatus());
            thread.setTopicThread(updatedThread.getTopicThread());
            thread.setTitleThread(updatedThread.getTitleThread());
            thread.setQuestionThread(updatedThread.getQuestionThread());


            thread.setCreatedAt(thread.getCreatedAt());
            thread.setUser(thread.getUser());
            thread.setVotes(thread.getVotes());

            thread.setCoverPhotoThread(thread.getCoverPhotoThread());


            // Save the updated answer to the database
            threadRepository.save(thread);
        } else {
            throw new EntityNotFoundException("Thread with ID " + updatedThread.getIdThread() + " not found");

        }
    }


    @Override
    public void deleteThread(Thread thread) {
        threadRepository.delete(thread);
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
    public List<Thread> getThreadsByTimeFrame(String timeFrame) {
        List<Thread> threads;
        if (timeFrame.matches("\\d{4}-\\d{2}-\\d{2}")) {
            // Fetch threads for a specific day
            LocalDate date = LocalDate.parse(timeFrame, DateTimeFormatter.ISO_DATE);
            threads = threadRepository.findThreadByCreatedAtBetween(date.atStartOfDay(), date.plusDays(1).atStartOfDay());
        } else if (timeFrame.matches("\\d{4}-\\d{2}")) {
            // Fetch threads for a specific month
            YearMonth yearMonth = YearMonth.parse(timeFrame, DateTimeFormatter.ofPattern("yyyy-MM"));
            threads = threadRepository.findThreadByCreatedAtBetween(
                    yearMonth.atDay(1).atStartOfDay(), yearMonth.atEndOfMonth().plusDays(1).atStartOfDay()
            );
        } else if (timeFrame.matches("\\d{4}")) {
            // Fetch threads for a specific year
            Year year = Year.parse(timeFrame, DateTimeFormatter.ofPattern("yyyy"));
            threads = threadRepository.findThreadByCreatedAtBetween(
                    year.atDay(1).atStartOfDay(), year.plusYears(1).atDay(1).atStartOfDay()
            );
        } else {
            throw new IllegalArgumentException("Invalid timeframe format. Supported formats: yyyy, yyyy-MM, yyyy-MM-dd");
        }
        return threads;
    }

    @Override
    public List<Thread> getThreadsSortedByVotes() {
        Iterable<Thread> optionalThread = threadRepository.findAll();
        List<Thread> threads = StreamSupport.stream(optionalThread.spliterator(), false).collect(Collectors.toList());
        threads.sort(Comparator.comparingInt(Thread::getVotes).reversed());
        int size = threads.size();
        int endIndex = Math.min(size, 3);
        threads = threads.subList(0, endIndex);
        return threads;
    }

    @Override
    public Set<Thread> findThreadByTopic(Topic topic) {
        return threadRepository.findByTopicThread(topic) ;
    }
}




