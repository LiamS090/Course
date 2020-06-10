using System;

namespace ConsoleGame
{
  class Game : SuperGame
  {
    public new static void UpdatePostion(string key, out int x, out int y) {
      switch(key) {
        case "RightArrow":
          x = 1;
          y = 0;
          break;
        case "LeftArrow":
          x = -1;
          y = 0;
          break;
        case "UpArrow":
          x = 0;
          y = -1;
          break;
        case "DownArrow":
          x = 0;
          y = 1;
          break;
        default:
          x = 0;
          y = 0;
          break;
      }
    } 

    public new static char UpdateCursor(string key) 
    { 
       switch(key)
     {    
        case "LeftArrow":
          return '<';
        case "RightArrow":
          return '>';
        case "UpArrow":
          return '^';
        case "DownArrow":
          return 'v';
        default:
          return '<';
     }
    }

    public new static int KeepInBounds(int coord, int maxValue){
        if (coord < 0)
      {
        return 0;
      }
      else if (coord >= maxValue)
      {
        return maxValue - 1;
      }
      else 
      {
        return coord;
      }
    } 

    public new static bool DidScore(int charX, int charY, int fruitX, int fruitY) {
         if(charX == charY && fruitX == fruitY) {
         return true;
         } else {
         return false;
      }
    }
  }
}