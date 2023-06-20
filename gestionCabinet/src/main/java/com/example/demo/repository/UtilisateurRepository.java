package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.*;
//import com.example.demo.enums.*;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

	Optional<Patient> findByEmailAndArchiveFalse(String email);
	List<Patient> findByNomAndArchiveFalse(String nom);
    List<Patient> findByIdAndArchiveFalse(Long idPatient);
    List<Patient> findByTelephoneAndArchiveFalse(int telephone);
    List<Patient> findByArchiveFalse();
    List<Patient> findByArchiveTrue();
    Optional<Utilisateur> findByEmail(String email);
    
    @Query("select count(*) from Patient p where p.sexe = 'F' ")
    Integer nbrFemme();
    @Query("select count(*) from Patient p where p.sexe = 'H' ")
    Integer nbrHomme();
    @Query("select count(*) from Patient p ")
    Integer nbrTotalPatient();
   
}
