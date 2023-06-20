package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Fichier;

public interface FichierRepository extends JpaRepository<Fichier, Long> {

	Fichier findFichierById(Long idFichier);
}
