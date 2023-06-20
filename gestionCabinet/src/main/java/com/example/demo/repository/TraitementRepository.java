package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Traitement;

public interface TraitementRepository extends JpaRepository<Traitement, Long> {
}
