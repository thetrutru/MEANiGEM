import sys

#sequence=input('Enter Sequence Here:' + '\n')

sequence = (sys.argv[1])

#merp = sequence.upper()
RNA = sequence.replace('T', 'U')
#print ('\n' + 'Here is your sense sequence:' + '\n' + RNA + '\n')


position=[RNA.find('A')]
base=RNA.find('A')
for n in RNA:
    if n=='A':
        position.append(RNA.find('A',base+1))
        base=RNA.find('A',base+1)
del position[-1]
output=''
for a in position:
    if RNA[a+1]=='U':
        if RNA[a+2]=='G':
            output+=RNA[a:]
            break
        else:
            continue
    else:
        continue
#print ('mRNA sequence starting from the start codon:' + '\n' + output + '\n')


lis=[]
i=0
while len(lis)*3<len(output):
    lis.append(output[i:i+3])
    i+=3 
for codon in lis:
    if codon=='UAA'or codon=='UAG' or codon=='UGA': 
        lis = lis[ : lis.index(codon)] #redefines lis as a list (called lis) where it starts from index 0 of lis until the index of codon(which is defined as stop codons)
        #if you wanted to include stop codon, just do [ : lis.index(codon) + 1]
        break
    
    else:
        continue

#print ('Above mRNA sequence fragmented in intervals of three:' + '\n' + ', '.join(lis) +'\n')

genetic_code= {
'UUU':'F','UUC':'F','UUA':'F','UUG':'F',
'CUU':'L','CUC':'L','CUA':'L','CUG':'L',
'AUU':'I','AUC':'I','AUA':'I',
'AUG':'M',
'GUU':'V','GUC':'V','GUA':'V','GUG':'V',
'UCU':'S','UCC':'S','UCA':'S','UCG':'S','AGU':'S','AGC':'S',
'CCU':'P','CCC':'P','CCA':'P','CCG':'P',
'ACU':'T','ACC':'T','ACA':'T','ACG':'T',
'GCU':'A','GCC':'A','GCA':'A','GCG':'A',
'UAU':'Y','UAC':'Y',
'CAU':'H','CAC':'H',
'CAA':'Q','CAG':'Q',
'AAU':'N','AAC':'N',
'AAA':'K','AAG':'K',
'GAU':'D','GAC':'D',
'GAA':'E','GAG':'E',
'UGU':'C','UGC':'C',
'UGG':'W',
'CGU':'R','CGC':'R','CGA':'R','CGG':'R','AGA':'R','AGG':'R',
'GGU':'G','GGC':'G','GGA':'G','GGG':'G'
}


AA=''
for a in lis:
    b=genetic_code[a]
    AA+=b
#print ('Amino acid sequence:' +'\n' + AA + '\n')
print (AA, end='')
