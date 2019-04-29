/*
 * DocMaker.java will query the database, and return a document (BSON) object that contains
 * all of the SMS subscribers, and to which notification(s) they want to get.
 */


import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class DocMaker {

	public static DBCursor main(String[] args) {
		int port = 27017;
		String ipAddr = "127.0.0.1";
		MongoClient mongoClient = connectToServer(ipAddr, port);
		return mongoClient.getDB("node-mongo-registration-login-api").
				getCollection("users").find(new BasicDBObject("notify", true));
	}

	private static MongoClient connectToServer(String ipAddr, int port) {

		MongoClient mongoClient = null;
		try {
			mongoClient = new MongoClient(ipAddr, port);
		} catch (MongoException e) {
			e.printStackTrace();
		} finally {
			if (mongoClient != null)
				System.out.println( "Connected to " + ipAddr + " on port " + port + "! :)");
		}
		return mongoClient;
	}
}