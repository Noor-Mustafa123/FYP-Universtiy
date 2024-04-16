package org.example.truebackend.Praactice;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentRepo extends JpaRepository<PracticeStudentEntity,Integer> {
    List<PracticeStudentEntity> findByName(String name);

}
