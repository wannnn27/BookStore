import * as icons from 'lucide-react';

const socialIcons = Object.keys(icons).filter(k => 
  /facebook|instagram|twitter|x/i.test(k)
);

console.log(socialIcons.join(', '));