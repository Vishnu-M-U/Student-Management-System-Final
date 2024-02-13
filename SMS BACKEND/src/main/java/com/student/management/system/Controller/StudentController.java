package com.student.management.system.Controller;

import com.student.management.system.Entity.Student;
import com.student.management.system.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/demo")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired

    //This injects an instance of StudentRepository into the controller
    private StudentRepository studentRepository;

    @PostMapping("/post")
    public String postStudent(@RequestBody Student student) {

        studentRepository.save(student);
        return "student added";
    }

    @GetMapping("/reset")
    public List<Student> getStudents(
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "5")int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);

        return studentPage.getContent();
    }

    //pagination
    @GetMapping("/get")
    public List<Student> getStudent(
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "5")int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);

        return studentPage.getContent();
    }

    //getting count
    @GetMapping("/count")
    public Long getCount(){
        return studentRepository.count();
    }

    //code for sorting
    @GetMapping("/get/sortascending")
    public List<Student> getStudentasc(@RequestParam(defaultValue = "asc") String sortDirection) {
        Sort sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "name");
        return studentRepository.findAll(sort);
    }

    @GetMapping("/get/sortdescending")
    public List<Student> getStudentdesc(@RequestParam(defaultValue = "desc") String sortDirection) {
        Sort sort = Sort.by(sortDirection.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, "name");
        return studentRepository.findAll(sort);
    }


    //to get specific ones
    @GetMapping("/get/{id}")
    public Optional<Student> getStudentById(@PathVariable int id) {
        return studentRepository.findById(id);
    }


    @PostMapping("/post/search")
    public List<Student> searchName(@RequestBody Student request) {
        //we can enter input(name) in lowercase,uppercase or mixed case because .toLowerCase() method converts the input
        //and also the database records to lowercase.
      String name = request.getName();
       List<Student> students = studentRepository.findByNameContainingIgnoreCase(name);
       return students;
    }

    //to delete specific id
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable int id) {
        studentRepository.deleteById(id);
        return "Student deleted";
    }

    //to update specific ones
    @PutMapping("/update/{id}")
    public Student updateStudent(@RequestBody Student StudentDetails) {
        Student updatedStudent = studentRepository.findById(StudentDetails.getId()).orElse(null);
        if (updatedStudent != null) {
            updatedStudent.setName(StudentDetails.getName());
            updatedStudent.setMaths(StudentDetails.getMaths());
            updatedStudent.setPhysics(StudentDetails.getPhysics());
            updatedStudent.setChemistry(StudentDetails.getChemistry());
            updatedStudent.setBiology(StudentDetails.getBiology());
            updatedStudent.setEnglish(StudentDetails.getEnglish());
            studentRepository.save(updatedStudent);

            return updatedStudent;
        }
        return null;
    }
}

