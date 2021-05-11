// Goal: Kellogg course reviews API!
//
// Business logic:
// - Courses can be taught by more than one lecturer (e.g. Brian Eng's KIEI-451 and Ben Block's KIEI-451)
// - Information on a course includes the course number (KIEI-451) and name (Intro to Software Development)
// - Lecturers can teach more than one course (e.g. Brian Eng teaches KIEI-451 and KIEI-925)
// - Reviews can be written (anonymously) about the lecturer/course combination (what would that be called?)
// - Reviews contain a String body, and a numeric rating from 1-5
// - Keep it simple and ignore things like multiple course offerings and quarters; assume reviews are written
//   about the lecturer/course combination only – also ignore the concept of a "user" and assume reviews
//   are written anonymously
//
// Tasks:
// - (Lab) Think about and write the domain model - fill in the blanks below
// - (Lab) Build the domain model and some sample data using Firebase
// - (Lab) Write an API endpoint, using this lambda function, that accepts a course number and returns 
//   information on the course and who teaches it
// - (Homework) Provide reviews of the lecturer/course combinations 
// - (Homework) As part of the returned API, provide the total number of reviews and the average rating for 
//   BOTH the lecturer/course combination and the course as a whole.

// === Domain model - fill in the blanks ===
// There are 4 models: Courses, Professor, Reviews, Sections
// There is one many-to-many relationship: Courses <-> Professor, which translates to two one-to-many relationships:
// - One-to-many: Professor -> Sections
// - One-to-many: Course -> Sections
// And one more one-to-many: Professor -> Reviews
// Therefore:
// - The first model, Courses, contains the following fields (not including ID): course name
// - The second model, Professors, contains the following fields: Professor First Name, Professor Last Name
// - The third model, Reviews, contains the following fields: Review Comments, Review Rating,  Section ID
// - The fourth model, Section, contains the following fields: course ID, Professor ID 

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/courses?courseNumber=KIEI-451
exports.handler = async function(event) {

let returnValue = []
  // establish a connection to firebase in memory
let db = firebase.firestore()
  // perform a query against firestore for all posts, wait for it to return, store in memory
let coursesQuery = await db.collection(`courses`).get()

// get the first document from the query

let courses = coursesQuery.docs

  // loop to get the course number being requested
  for (let courseIndex=0; courseIndex < courses.length; courseIndex++) {
    // get the id from the document
    let courseId = courses[courseIndex].id

    // get the data from the document
    let courseData = courses[courseIndex].data()

    // create an Object to be added to the return value of our lambda
    let courseObject = {
      id: courseId,
      courseName: courseData.courseName,
      courseNumber: courseData.courseNumber,
      sectionDetails: []
    } 

// get the sections for this course, wait for it to return, store in memory
let sectionsQuery = await db.collection(`sections`).where(`courseId`,`==`, courseId).get()
// get the documents from the query
let sections = sectionsQuery.docs
  for(let sectionIndex =0; sectionIndex < sections.length; sectionIndex++) {
    // get the id from the comment document
    let sectionId = sections[sectionIndex].id
    // get the data from the comment document
    let sectionData = sections[sectionIndex].data()
    // create an Object to be added to the comments Array of the post
    let sectionObject = {
      id: sectionId,
      courseId: sectionData.courseId,
      professorId: sectionData.professorId,
      professorDetails: []
    }
// get the professorss for this section, wait for it to return, store in memory
let professorsQuery = await db.collection(`professors`).get()
// get the documents from the query
let professors = professorsQuery.docs
  for(let professorIndex =0; professorIndex < professors.length; professorIndex++) {
    // get the id from the comment document
    let professorId = professors[professorIndex].id
    // get the data from the comment document
    let professorData = professors[professorIndex].data()
    // create an Object to be added to the comments Array of the post
    let professorObject = {
      id: professorId,
      professorFirstName: professorData.professorFirstName,
      professorLastName: professorData.professorLastName
    }
 // add the professor Object to the section
     sectionObject.professorDetails.push(professorObject)
  }

    // add the section Object to the course
    courseObject.sectionDetails.push(sectionObject)

}
  // add the Object to the return value
    returnValue.push(courseObject)
  }


  // set a new Array as part of the return value

  // ask Firebase for the sections corresponding to the Document ID of the course, wait for the response

  // get the documents from the query

  // loop through the documents
    // get the document ID of the section
    // get the data from the section
    // ask Firebase for the lecturer with the ID provided by the section; hint: read "Retrieve One Document (when you know the Document ID)" in the reference
    // get the data from the returned document
    // add the lecturer's name to the section's data
    // add the section data to the courseData
    // 🔥 your code for the reviews/ratings goes here

  // return the standard response
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}