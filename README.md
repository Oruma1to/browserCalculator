# browserCalculator

Description
This is a simple browser calculator built out using a custom class and some event listeners.

Dependancies
None!

How to start
Simply download the repository, once in the folder of the repository open the index.html file in your browser and it should run. Note - The css was tested on chrome, other browsers may or may not have variant styling issues.

Project MVP - Build out fully functional basic calculator reminiscent of the Mac Os Calculator.
  - Calculator class with methods built in to handle the following.
    - clear, delete,calculatePercentage, appendNumber, chooseOperation, compute, getDisplayNumber, updateDisplay
  - Event listeners have been added on the window to allow the user to access all funcationality using the keyboard.
    - / division, * multiplication, + addition, - subtraction, = compute, % to convert to a percentage.
  
Joshua Aponte (Me)

Acknowledgements
Any additional research outside of my existing knowledge was done by reviewing MDN Api documents.

Final updates I would implement in the future
  - Change the compute button event listener from = to Enter, currently when using enter it just re-enters the last button used, hence why I moved towards using the literal = to compute instead.
  - Add the ability to toggle an integer entered between positive and negative.
  - Add more capabilities to make it more like a scientific calculator, sin cos log etc....