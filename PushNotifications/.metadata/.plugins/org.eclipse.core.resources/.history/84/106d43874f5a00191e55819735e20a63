import java.util.List;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;
 
public class DocMaker {
    public static void main(String[] args) {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient( "127.0.0.1" , 27017 );
            List<String> dbs = mongoClient.getDatabaseNames();
            System.out.println("The databases that exist on this server are:\n");
            for(int i = 0; i < dbs.size(); i++) {
            	System.out.println(dbs.get(i));
            }

        } catch (MongoException e) {
            e.printStackTrace();
        } finally {
            if(mongoClient!=null)
            System.out.println("Connected to MongoDB!");
        }
    }
}