<?php

class Cliente
{
    public $table = 'Cliente';
    public $fields = 'clienId
                ,clienNombre
                ,clienDireccion
                ,CONVERT(VARCHAR, clienFechaAlta, 126) clienFechaAlta
                ,clienBorrado'; 

    public $join = "";
    
    public function getId ($db) {

        $sql = "SELECT $this->fields FROM $this->table
                $this->join
                WHERE clienId = ?";
        
        $stmt = SQL::query($db, $sql, [ID] );

        return sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
    }

    public function get ($db) {
        $sql = "SELECT $this->fields FROM $this->table
                $this->join
                WHERE clienBorrado = 0";

        $params = null;
        if (isset( $_GET["clienNombre"])){
            $params = ["%" . $_GET["clienNombre"] . "%"];
            $sql = $sql . " AND clienNombre LIKE ? ";
        };

        $stmt = SQL::query($db, $sql, $params);
        $results = [];
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $results[] = $row;
        }

        return $results;
    }

    public function delete ($db) {
        $stmt = SQL::query($db,
        "UPDATE $this->table SET clienBorrado = 1
        WHERE clienId = ?", [ID] );

        sqlsrv_fetch($stmt);
        return [];
    }

    public function post ($db) {
        $stmt = SQL::query($db,
        "INSERT INTO $this->table
        (clienNombre
        ,clienDireccion
        ,clienFechaAlta
        ,clienBorrado)
        VALUES (?,?,GETDATE(),0);

        SELECT @@IDENTITY clienId, CONVERT(VARCHAR, GETDATE(), 126) clienFechaAlta;",
        [DATA["clienNombre"], DATA["clienDireccion"]] );

        sqlsrv_fetch($stmt); // INSERT
        sqlsrv_next_result($stmt);// SELECT @@IDENTITY
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        $results = DATA;
        $results["clienId"] = $row["clienId"];
        $results["clienFechaAlta"] = $row["clienFechaAlta"];
        $results["clienBorrado"] = 0;
        return $results;
    }

    public function put ($db) {
        $stmt = SQL::query($db,
        "UPDATE Cliente
        SET clienNombre = ?
            ,clienDireccion = ?
        WHERE clienId = ?",
        [
            DATA["clienNombre"],
            DATA["clienDireccion"],
            DATA["clienId"]
        ] );

        sqlsrv_fetch($stmt);
        return DATA;
    }


}

?>