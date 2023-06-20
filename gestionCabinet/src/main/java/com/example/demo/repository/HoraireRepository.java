package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Horaire;

public interface HoraireRepository extends JpaRepository<Horaire, Long> {
	@Query("select h from Horaire h where h.jour = :jour")
    Horaire getHoraireByJour(@Param("jour") String jour);
}
