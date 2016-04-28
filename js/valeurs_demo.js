/* sample of test data, used in the 'test' part of the application */
var test = {
    "customer": { "email": "jean.dupont@mail.com", "id": 23, "firstname": "Jean", "lastname": "Dupont" }, 
    "client": null, 
    "hivegroups": [
        {
        "id_hive_group":18,
        "id_client":11,
        "name":"Rucher principal",
        "harvest":20,
        "date_add":"2016-03-08T15:32:09+0100",
        "date_upd":"2016-01-18T14:03:22+0100"
        }
    ],
    "hives": [
        {
            "id_hive":6,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.6",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"dadant",
            "bees_type":"buckfast",
            "material":"wood",
            "support":"steel_frame",
            "state":"bad",
            "harvest":20,
            "notes":"",
            "date_add":"2016-01-18T14:03:22+0100",
            "date_upd":"2016-03-08T15:32:09+0100", 
            "data": {
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}}
        },
        {
            "id_hive":22,"id_client":11,"id_hive_group":18,"name":"RUCHE.10","latitude":0,"longitude":0,
            "active":true,"hive_type":"dadant","bees_type":"buckfast","material":"wood",
            "support":"steel_frame","state":"bad","harvest":0,"notes":"",
            "date_add":"2016-03-08T15:46:32+0100","date_upd":"2016-03-08T15:46:32+0100", 
            "data": {
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}}
        },
        {
            "id_hive":23,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.11",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"dadant",
            "bees_type":"buckfast",
            "material":"wood",
            "support":"steel_frame",
            "state":"bad",
            "harvest":0,
            
            "notes":"",
            "date_add":"2016-03-08T15:46:51+0100",
            "date_upd":"2016-03-08T15:46:51+0100",
            "data": {"idruche":2,"idclient":1,
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}
            }
        },
        {
            "id_hive":24,
            "id_client":11,
            "id_hive_group":18,
            "name":"MaRuche",
            "latitude":0,
            "longitude":0,
            "active":false,
            "hive_type":"test",
            "bees_type":"test",
            "material":"test",
            "support":"test",
            "state":"test",
            "harvest":1,
            "date_add":"2011-01-01T00:00:00+0100",
            "date_upd":"2011-01-01T00:00:00+0100",
            "data": {"idruche":2,"idclient":1,
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}
            }
        }
    ], 
    
};
var isTest = false;
