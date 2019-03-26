
/*
CLEAR ANY  "batchInfos" : [] before addding a record.
 */
let error = false

let res = [
//    db.cinergi,
    db = db.getSiblingDB('cinergi'),
    db.sources.insertMany([
        {
            "_id" : ObjectId("5c901ccf8b87bc00218b25d3"),
            "sourceInformation" : {
                "resourceID" : "cinergi-0000",
                "name" : "Cinergi Form",
                "dataSource" : "Cinergi Form",
                "description" : ""
            },
            "schema" : "",
            "provenance" : "",
            "ingestConfiguration" : {
                "ingestMethod" : "form",
                "crawlFrequency" : {
                    "crawlType" : "Frequency",
                    "hours" : "48",
                    "minutes" : "0",
                    "startDays" : [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "startTime" : "0:00",
                    "operationEndTime" : "24:00"
                }
            },
            "contentSpecification" : {},
            "originalRecordIdentifierSpec" : {
                "fields" : [
                    "$.'gmd:MD_Metadata'.'gmd:fileIdentifier'.'gco:CharacterString'.'_$'"
                ],
                "delimiter" : [
                    ":"
                ],
                "method" : "Value"
            },
            "documentProcessing" : [
                "UUID Generation",
                "XML2Cinergi",
                "Index"
            ],
            "batchInfos" : []
        },
        {
            "_id" : ObjectId("5c9136be08813b001ed92bff"),
            "sourceInformation" : {
                "resourceID" : "cinergi-9998",
                "name" : "Demonstration gmi__MI_Metadata",
                "dataSource" : "Demonstration_gmi",
                "description" : ""
            },
            "schema" : "",
            "provenance" : "",
            "ingestConfiguration" : {
                "ingestMethod" : "WAF",
                "ingestURL" : "http://hydro10.sdsc.edu/metadata/example/gmi",
                "allowDuplicates" : "False",
                "crawlFrequency" : {
                    "crawlType" : "Frequency",
                    "hours" : "48",
                    "minutes" : "0",
                    "startDays" : [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "startTime" : "0:00",
                    "operationEndTime" : "24:00"
                }
            },
            "contentSpecification" : {
                "keepMissing" : "false",
                "locale" : "en_US"
            },
            "originalRecordIdentifierSpec" : {
                "fields" : [
                    "$.'gmi:MI_Metadata'.'gmd:fileIdentifier'.'gco:CharacterString'.'_$'"
                ],
                "delimiter" : [
                    ":"
                ],
                "method" : "Value"
            },
            "documentProcessing" : [
                "UUID Generation",
                "XML2Cinergi",
                "Index"
            ],
            "batchInfos" : []
        },
        {
            "_id" : ObjectId("5c902b7d08813b002edfb5a5"),
            "sourceInformation" : {
                "resourceID" : "cinergi-9999",
                "name" : "Demonstration gmd__MD_Metadata",
                "dataSource" : "Demonstration_gmd",
                "description" : ""
            },
            "schema" : "",
            "provenance" : "",
            "ingestConfiguration" : {
                "ingestMethod" : "WAF",
                "ingestURL" : "http://hydro10.sdsc.edu/metadata/example/gmd",
                "allowDuplicates" : "False",
                "crawlFrequency" : {
                    "crawlType" : "Frequency",
                    "hours" : "48",
                    "minutes" : "0",
                    "startDays" : [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                    "startTime" : "0:00",
                    "operationEndTime" : "24:00"
                }
            },
            "contentSpecification" : {
                "keepMissing" : "false",
                "locale" : "en_US"
            },
            "originalRecordIdentifierSpec" : {
                "fields" : [
                    "$.'gmd:MD_Metadata'.'gmd:fileIdentifier'.'gco:CharacterString'.'_$'"
                ],
                "delimiter" : [
                    ":"
                ],
                "method" : "Value"
            },
            "documentProcessing" : [
                "UUID Generation",
                "XML2Cinergi",
                "Index"
            ],
            "batchInfos" : []
        }

        ]),
,


]

printjson(res)

if (error) {
    print('Error, exiting')
    quit(1)
}