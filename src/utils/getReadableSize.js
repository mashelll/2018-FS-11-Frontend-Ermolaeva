function getReadableSize(size) {
	var n = 0;
	var arrayOfSizes = new Array("", "kb", "Мb", "Gb", "Tb");
	while (size >= 1024) { 
		n++;
		size /= 1024;
	}
	size = Math.round(size) + arrayOfSizes[n];
	return size;
}
alert('10000='+getReadableSize(10000));
