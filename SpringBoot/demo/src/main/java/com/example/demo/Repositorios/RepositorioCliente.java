package com.example.demo.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Cliente;

import java.util.ArrayList;


@Repository
public interface RepositorioCliente  extends CrudRepository <Cliente, String>{
    public abstract ArrayList<Cliente> findByemailcliente(String emailcliente);
    public abstract ArrayList<Cliente> findBynamecliente(String namecliente);
    
}
