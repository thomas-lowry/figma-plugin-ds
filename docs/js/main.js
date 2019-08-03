import { layers } from './components/_layers.js';
import { cursor } from './components/_cursor.js';
import { scroll } from './components/_scroll.js';
import { frame } from './components/_frame.js';

//initiate functions functions
layers();
frame();
scroll();
cursor('move');

//highligh code
hljs.initHighlightingOnLoad();