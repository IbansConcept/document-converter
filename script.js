// script.js
document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const formatSelect = document.getElementById('formatSelect');
    const downloadList = document.getElementById('downloadList');
    const resultSection = document.getElementById('result');

    if (fileInput.files.length === 0) {
        alert('Veuillez sélectionner des fichiers.');
        return;
    }

    if (fileInput.files.length > 5) {
        alert('Veuillez sélectionner au maximum 5 fichiers.');
        return;
    }

    const files = fileInput.files;
    const format = formatSelect.value;

    downloadList.innerHTML = ''; // Réinitialiser la liste des téléchargements

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Simuler la conversion avec un Blob du même type de fichier
            const fileContent = e.target.result;

            // Créer un Blob avec le même contenu mais avec le nouveau type MIME
            const blob = new Blob([fileContent], { type: format });
            const url = URL.createObjectURL(blob);

            // Créer un lien de téléchargement pour chaque fichier
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted-${file.name.split('.')[0]}.${format.split('/')[1]}`;
            link.textContent = `Télécharger ${file.name.split('.')[0]}.${format.split('/')[1]}`;
            listItem.appendChild(link);
            downloadList.appendChild(listItem);
        }

        reader.readAsArrayBuffer(file); // Lire le fichier comme un tableau de bytes
    });

    resultSection.classList.remove('hidden');
});
