// Firebase Firestore database service
// Handles all database operations for the app

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Collection names
const COLLECTIONS = {
  LOCATIONS: 'locations',
  PERSONNEL: 'personnel',
  REQUIRED_OCCUPANCY: 'requiredOccupancy',
  SCHEDULED_SHIFTS: 'scheduledShifts',
  ACTUAL_OCCUPANCY: 'actualOccupancy',
};

// Generic functions for CRUD operations

// Get all documents from a collection
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

// Get a single document by ID
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

// Add a new document
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return docId;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

// Set a document (create or update)
export const setDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return docId;
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// Subscribe to real-time updates for a collection
export const subscribeToCollection = (collectionName, callback, filters = []) => {
  try {
    let q = query(collection(db, collectionName));
    
    // Apply filters if provided
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });
    
    // Add ordering if needed
    q = query(q, orderBy('updatedAt', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(documents);
    }, (error) => {
      console.error(`Error subscribing to ${collectionName}:`, error);
      callback([]);
    });
  } catch (error) {
    console.error(`Error setting up subscription to ${collectionName}:`, error);
    return () => {}; // Return empty unsubscribe function
  }
};

// Subscribe to real-time updates for a single document
export const subscribeToDocument = (collectionName, docId, callback) => {
  try {
    const docRef = doc(db, collectionName, docId);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      } else {
        callback(null);
      }
    }, (error) => {
      console.error(`Error subscribing to document from ${collectionName}:`, error);
      callback(null);
    });
  } catch (error) {
    console.error(`Error setting up document subscription:`, error);
    return () => {}; // Return empty unsubscribe function
  }
};

// Specific functions for app data

// Locations
export const getLocations = () => getAllDocuments(COLLECTIONS.LOCATIONS);
export const addLocation = (data) => addDocument(COLLECTIONS.LOCATIONS, data);
export const updateLocation = (id, data) => updateDocument(COLLECTIONS.LOCATIONS, id, data);
export const deleteLocation = (id) => deleteDocument(COLLECTIONS.LOCATIONS, id);
export const subscribeToLocations = (callback) => subscribeToCollection(COLLECTIONS.LOCATIONS, callback);

// Personnel
export const getPersonnel = () => getAllDocuments(COLLECTIONS.PERSONNEL);
export const addPersonnel = (data) => addDocument(COLLECTIONS.PERSONNEL, data);
export const updatePersonnel = (id, data) => updateDocument(COLLECTIONS.PERSONNEL, id, data);
export const deletePersonnel = (id) => deleteDocument(COLLECTIONS.PERSONNEL, id);
export const subscribeToPersonnel = (callback) => subscribeToCollection(COLLECTIONS.PERSONNEL, callback);

// Required Occupancy
export const getRequiredOccupancy = () => getAllDocuments(COLLECTIONS.REQUIRED_OCCUPANCY);
export const addRequiredOccupancy = (data) => addDocument(COLLECTIONS.REQUIRED_OCCUPANCY, data);
export const updateRequiredOccupancy = (id, data) => updateDocument(COLLECTIONS.REQUIRED_OCCUPANCY, id, data);
export const deleteRequiredOccupancy = (id) => deleteDocument(COLLECTIONS.REQUIRED_OCCUPANCY, id);
export const subscribeToRequiredOccupancy = (callback) => subscribeToCollection(COLLECTIONS.REQUIRED_OCCUPANCY, callback);

// Scheduled Shifts
export const getScheduledShifts = () => getAllDocuments(COLLECTIONS.SCHEDULED_SHIFTS);
export const addScheduledShift = (data) => addDocument(COLLECTIONS.SCHEDULED_SHIFTS, data);
export const updateScheduledShift = (id, data) => updateDocument(COLLECTIONS.SCHEDULED_SHIFTS, id, data);
export const deleteScheduledShift = (id) => deleteDocument(COLLECTIONS.SCHEDULED_SHIFTS, id);
export const subscribeToScheduledShifts = (callback) => subscribeToCollection(COLLECTIONS.SCHEDULED_SHIFTS, callback);

// Actual Occupancy
export const getActualOccupancy = () => getAllDocuments(COLLECTIONS.ACTUAL_OCCUPANCY);
export const addActualOccupancy = (data) => addDocument(COLLECTIONS.ACTUAL_OCCUPANCY, data);
export const updateActualOccupancy = (id, data) => updateDocument(COLLECTIONS.ACTUAL_OCCUPANCY, id, data);
export const deleteActualOccupancy = (id) => deleteDocument(COLLECTIONS.ACTUAL_OCCUPANCY, id);
export const subscribeToActualOccupancy = (callback) => subscribeToCollection(COLLECTIONS.ACTUAL_OCCUPANCY, callback);

// Initialize default data (run once to seed the database)
export const initializeDefaultData = async (initialLocations, initialPersonnel, initialRequiredOccupancy) => {
  try {
    // Check if data already exists
    const existingLocations = await getLocations();
    if (existingLocations.length > 0) {
      console.log('Data already exists, skipping initialization');
      return;
    }

    // Add locations
    for (const location of initialLocations) {
      await setDocument(COLLECTIONS.LOCATIONS, location.id.toString(), location);
    }

    // Add personnel
    for (const person of initialPersonnel) {
      await setDocument(COLLECTIONS.PERSONNEL, person.id.toString(), person);
    }

    // Add required occupancy
    for (const req of initialRequiredOccupancy) {
      await setDocument(COLLECTIONS.REQUIRED_OCCUPANCY, req.id.toString(), req);
    }

    console.log('Default data initialized successfully');
  } catch (error) {
    console.error('Error initializing default data:', error);
    throw error;
  }
};

