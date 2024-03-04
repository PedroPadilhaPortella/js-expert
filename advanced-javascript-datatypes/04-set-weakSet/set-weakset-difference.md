The main difference is that references to objects in Set are strong while references to objects in WeakSet are weak. This means that an **object in WeakSet can be garbage collected if there is no other reference to it**.

Other differences (or rather side-effects) are:

 - Sets can store any value. WeakSets are collections of objects only.
 - WeakSet does not have _size_ property.
 - WeakSet does not have _clear, keys, values, entries, forEach_ methods.
 - WeakSet is not iterable.