package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.CodeMdp;
import com.example.demo.entities.Utilisateur;

public interface CodeMdpRepository extends JpaRepository<CodeMdp, Long>  {
	CodeMdp findByCodeMdp(int codeMdp);
	
  /* @Query("delete from CodeMdp c where c.user = :user")
	void deleteCodeUser(@Param("user") Utilisateur user);*/
	
}
