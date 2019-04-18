import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class DocMaker {

	public static DBCursor main(String[] args) {
		MongoClient mongoClient = connectToServer();
		DB db = mongoClient.getDB("node-mongo-registration-login-api");
		BasicDBObject query = new BasicDBObject("notify", true);
		DBCursor cursor = db.getCollection("users").find(query);
		return cursor;
	}
	
	private static MongoClient connectToServer() {
		int port = 27017;
		String ipAddr = "127.0.0.1";
		MongoClient mongoClient = null;
		try {
			mongoClient = new MongoClient(ipAddr, port);
		} catch (MongoException e) {
			e.printStackTrace();
		} finally {
			if (mongoClient != null)
				System.out.println("Connected to " + ipAddr + " on port " + port + "! :)");
		}
		return mongoClient;
	}
}