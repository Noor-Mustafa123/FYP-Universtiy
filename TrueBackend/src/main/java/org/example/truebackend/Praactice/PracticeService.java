package org.example.truebackend.Praactice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PracticeService {
    @Autowired
    StudentRepo studentRepo;



    public void practiceSaveMethod (PracticeStudentEntity StudentEntity,PracticeLaptopEntity LaptopEntity) {
        studentRepo.save(StudentEntity);

    }
    public void oneToManySaveMethod (PracticeStudentEntity StudentEntity){
      studentRepo.save(StudentEntity);
    }
}
