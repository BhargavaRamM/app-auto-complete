var elasticsearch  = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host : "localhost:9200",
  log : "info"
});

var indexName = "dummy";

/*
 * Delete an existing index
 */
function deleteIndex() {
  return elasticClient.indices.delete({
    index : indexName
  });
}

/*
 * create an index
 */

 function createIndex() {
   return elasticClient.indices.create({
     index : indexName
   });
 }

 function indexExists() {
   return elasticClient.indices.exists({
     index : indexName
   });
 }

function initMapping() {
  return elasticClient.indices.putMapping({
    index : indexName,
    type : "document",
    body : {
      properties : {
        title : { type : "string"},
        content : {type : "string"},
        suggest : {
          type : "completion",
          analyzer : "simple",
          search_analyzer : "simple",
          payloads : true
        }
      }
    }
  });
}

function addDocument(document) {
  return elasticClient.index({
    index : indexName,
    type : "document",
    body : {
      title : document.title,
      content : document.content,
      suggest : {
        input : document.title.split(" "),
        output : document.title,
        payload : document.metadata || {}
      }
    }
  });
}

function getSuggestions(input) {
  return elasticClient.suggest({
    index : indexName,
    type : "document",
    body : {
      docsuggest : {
        text : input,
        completion : {
          field : "suggest",
          fuzzy : true
        }
      }
    }
  })
}

 exports.initMapping = initMapping;
 exports.deleteIndex = deleteIndex;
 exports.createIndex = createIndex;
 exports.indexExists = indexExists;
 exports.addDocument = addDocument;
 exports.getSuggestions = getSuggestions;
