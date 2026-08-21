//GIT Basic Commands
git status
git add <filename> // git add .
git commit -m "Commit Message"
git push
git push origin main

//Assignment - 13th Aug
1. Get the sum of first 100 Numbers 
2. Reverse the number - 3982 - output should be 2893
3. Reverse the String - Javascript - output should be tpircsavaJ

//Assignment - 19th Aug - https://opensource-demo.orangehrmlive.com/

1. Login into OrangeHRMS - 
Assert the following elements is visible or not -
- Time at Work
- My Actions
- Quick Launch
- Buzz Latest Posts
- Employees on Leave Today
- Employee Distribution by Sub Unit


2. Login into OrangeHRMS - 
Validate all the menu item is visible or not
- Admin
- PIM
- Leave
- Time
- Recruitment
- My Info
- Peformance 
- Dashboard
- Directory
- Maintence
- Claim
- Buzz

3.Login into OrangeHRMS -
- Get the name of the user 
- Print in the console area
- Perform Logout



Assignment - 20th Aug

https://selectorshub.com/ - Plugin URL - You need to try diff Plugin
https://demoqa.com/automation-practice-form - Form - You need to try Below Xpath

//Differents Ways to Write XPATHs


1. Absolute XPath

Starts from the root of the HTML document.

/html/body/div[1]/div[2]/input
Very specific
Usually not recommended because small UI changes can break it.
2. Relative XPath

Starts from anywhere in the document using //.

//input

Better than absolute XPath because it doesn't depend on the entire DOM hierarchy.

3. XPath using an ID
//input[@id='username']

Or:

//*[@id='username']

Usually one of the most reliable approaches when the ID is stable.

4. XPath using a class
//input[@class='form-control']

If the element has multiple classes, exact matching can be problematic. You can use:

//input[contains(@class,'form-control')]
5. XPath using text
//button[text()='Login']

Useful for buttons, links, labels, etc.

You can also use:

//button[contains(text(),'Login')]
6. Using multiple attributes
//input[@type='text' and @name='username']

Or:

//input[@id='username' and @placeholder='Username']

This is useful when a single attribute isn't unique.

7. Using contains()
//input[contains(@id,'user')]

For text:

//button[contains(text(),'Login')]
8. Using starts-with()
//input[starts-with(@id,'user_')]

Useful when part of an attribute is dynamic.

9. Using normalize-space()

Handles extra spaces in text:

//button[normalize-space()='Login']

This is often better than:

//button[text()='Login']

10. XPath using parent-child relationship
//div[@id='login']//input

Or:

//form[@id='loginForm']/input
11. Using parent
//input[@id='username']/parent::div

Finds the parent <div> of the input.

12. Using ancestor
//input[@id='username']/ancestor::form

Finds an ancestor <form>.

13. Using following-sibling
//label[text()='Username']/following-sibling::input

Useful when two elements are siblings.

14. Using preceding-sibling
//input[@id='username']/preceding-sibling::label
15. Using following
//label[text()='Username']/following::input[1]

Finds the first input appearing after the label in the document.

16. Using XPath indexes
//input[1]

or:

(//input)[2]

Be careful with indexes because they can become invalid when the page structure changes.

17. Using or
//input[@id='username' or @name='username']
18. Using not()
//input[not(@disabled)]

Finds inputs that aren't disabled.

19. Using variables/partial dynamic attributes

For example, if the HTML is:

<input id="user_12345">

You can use:

//input[starts-with(@id,'user_')]

or:

//input[contains(@id,'user_')]
20. Combining relationships and conditions

For example:

//div[@class='login']//button[contains(normalize-space(),'Login')]

This is often a good practical XPath because it narrows the search to a meaningful section of the page.

In Selenium automation, a good preference order is generally:

Stable ID
   ↓
Unique name / data-* attribute
   ↓
Unique combination of attributes
   ↓
Relative XPath with parent/child relationships
   ↓
Text-based XPath
   ↓
contains()/starts-with()
   ↓
Indexes
   ↓
Absolute XPath

If you're preparing for Selenium interviews, the most important XPath concepts to know are //, @attribute, text(), contains(), starts-with(), and/or, parent, ancestor, following-sibling, preceding-sibling, and XPath indexes.