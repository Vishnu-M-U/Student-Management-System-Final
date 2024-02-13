package com.student.management.system.Repository;

import com.student.management.system.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findByNameContainingIgnoreCase(String name);
}



