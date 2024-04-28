package Old_Hibernate_practiceproject_classes;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

/**
 * Hello world!
 */
public class App {

    public static void main(String[] args) {
        System.out.println("Hello World!");
        try{
//    Bootstrapping Hibernate with a new Configuration object.
        Configuration cfg = new Configuration();
//    Configuring Hibernate with the hibernate.cfg.xml using configure() method.
        cfg.configure();
//  the buildSessionFactory() method is called on the Configuration object to create a SessionFactory using the configuration data in the Configuration object.
//  This SessionFactory can then be used to create Session instances for interacting with the database.
        SessionFactory sessionFactory = cfg.buildSessionFactory();

        System.out.println(sessionFactory);

//            Opening a new session form the build factory
//            Session newSession = sessionFactory.openSession();
            Entity1 obj = new Entity1(1,"Noor",21,"IT");
            Entity1 obj2 = new Entity1(2,"Hamza",22,"Sales");
            Entity1 obj3 = new Entity1(3,"Abid",23,"Finance");
            Entity1 obj4 = new Entity1(4, "John", 24, "Marketing");
            Entity1 obj5 = new Entity1(5, "Emma", 25, "HR");
            Entity1 obj6 = new Entity1(6, "David", 26, "Sales");
            Entity1 obj7 = new Entity1(7,"finality",120000,"Final");
            Entity1 objUltimate = new Entity1(8,"ultimatality",120000,"Ultimaly");
          Session openSession =  sessionFactory.openSession();
            Transaction transaction = openSession.beginTransaction();
            openSession.save(objUltimate);
            transaction.commit();
            openSession.close();
            System.out.println("the object has been stored in the database");
        }
        catch(Exception e){
            System.out.println("Connection error");
        }

    }
}
