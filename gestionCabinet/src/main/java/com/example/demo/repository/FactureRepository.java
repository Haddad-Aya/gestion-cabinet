package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.*;

public interface FactureRepository extends JpaRepository<Facture, Long> {

	List<Facture> findByDateFacture(Date dateFacture);
	
	//List<Facture> findByDateFactureBetweenAndMedecin(Date premDate,Date deuxDate,Medecin medecin);
	
	@Query("select f from Facture f where f.dateFacture >= :from and f.dateFacture <= :to")
    List<Facture> findByDateMedecin(@Param("from") Date from, @Param("to") Date to);
	
	//@Query("select f from Facture f order by dateFacture desc where f.medecin = :medecin")
    List<Facture> findByOrderByDateFactureDesc();
	
	@Query("select sum(f.prix) from Facture f where f.dateFacture >= :from and f.dateFacture <= :to ")
	Float sommeFactureByDate(@Param("from") Date from, @Param("to") Date to);
	
	@Query("select sum(f.prix) from Facture f where f.dateFacture = :date ")
	Float sommeFactureJour(@Param("date") Date date);
	
	@Query("select sum(f.prix) from Facture f")
    Float sommeFacture();
}
