// Este evento asegura que el script se ejecute solo después de que toda la página (DOM) se haya cargado.
document.addEventListener('DOMContentLoaded', () => {

    // --- FADE-IN ANIMATION ON SCROLL ---
    // Esta parte del código hace que los elementos aparezcan con una animación suave cuando el usuario hace scroll.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Se aplica el observador a todos los elementos con la clase 'fade-in'.
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- DARK MODE ---
    // Lógica para cambiar entre modo claro y oscuro.
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Función que aplica el tema (claro u oscuro) al documento.
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
        }
    };

    // Evento de clic en el botón para cambiar de tema.
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            // Se guarda la preferencia del usuario en el almacenamiento local del navegador.
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
    
    // Al cargar la página, se aplica el tema guardado o el claro por defecto.
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // --- RECIPE DATA & LOGIC ---
    // Aquí es donde viven todas las recetas. En el futuro, esto vendrá de una base de datos o una API.
    const recipes = [
        { id: 1, title: 'Ensalada de Quinoa y Aguacate', time: 15, objetivo: 'perder-grasa', ingredients: [
            '1 taza de quinoa cocida', '1 aguacate en cubos', '1 taza de tomates cherry partidos', '1/2 pepino en cubos', '1/4 taza de cebolla morada picada', 'Jugo de 1 limón', '2 cdas de aceite de oliva', 'Sal y pimienta al gusto'
            ], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', calories: 350, 
            instructions: [
                'En un bol grande, combina la quinoa, aguacate, tomates, pepino y cebolla.',
                'En un recipiente pequeño, mezcla el jugo de limón, aceite de oliva, sal y pimienta.',
                'Vierte el aderezo sobre la ensalada y mezcla suavemente.',
                'Sirve inmediatamente o refrigera hasta por 2 días.'
            ],
            benefits: 'Rica en proteínas completas, grasas saludables y fibra. Ideal para la saciedad y la salud digestiva.'
        },
        { id: 2, title: 'Salmón al Horno con Brócoli', time: 25, objetivo: 'tonificar', ingredients: [
            '2 filetes de salmón (150g c/u)', '1 cabeza de brócoli en floretes', '1 limón en rodajas', '2 dientes de ajo picados', '2 cdas de aceite de oliva', 'Sal, pimienta y eneldo'
            ], img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop', calories: 450,
            instructions: [
                'Precalienta el horno a 200°C (400°F).',
                'En una bandeja para hornear, mezcla el brócoli con 1 cda de aceite, sal y pimienta.',
                'Coloca los filetes de salmón en la misma bandeja. Unta con el resto del aceite, ajo, eneldo, sal y pimienta.',
                'Coloca las rodajas de limón sobre el salmón.',
                'Hornea por 15-20 minutos, o hasta que el salmón esté cocido y el brócoli tierno.'
            ],
            benefits: 'Excelente fuente de Omega-3 y proteínas de alta calidad, que ayudan a la recuperación muscular y la salud cerebral. El brócoli aporta vitaminas y antioxidantes.'
        },
        { id: 3, title: 'Batido de Proteínas y Plátano', time: 5, objetivo: 'aumentar-masa', ingredients: [
            '1 scoop de proteína en polvo (vainilla o chocolate)', '1 plátano congelado', '1 taza de leche (almendras o vaca)', '1 cda de mantequilla de maní', '1/2 taza de hielo (opcional)'
            ], img: 'https://images.unsplash.com/photo-1610348725531-843dff567e2c?q=80&w=1974&auto=format&fit=crop', calories: 400,
            instructions: [
                'Añade todos los ingredientes a una licuadora.',
                'Licúa a alta velocidad hasta que la mezcla esté suave y cremosa.',
                'Sirve inmediatamente. Ideal para después de entrenar.'
            ],
            benefits: 'Aporte rápido de proteínas para la reparación muscular post-entrenamiento. Los carbohidratos del plátano reponen las reservas de energía.'
        },
        { id: 4, title: 'Pechuga de Pollo con Espárragos', time: 20, objetivo: 'tonificar', ingredients: [
            '2 pechugas de pollo (150g c/u)', '1 manojo de espárragos', '2 dientes de ajo en láminas', '1 cda de aceite de oliva', 'Jugo de 1/2 limón', 'Sal, pimienta y pimentón'
            ], img: 'https://images.unsplash.com/photo-1604329263228-a42e7c3a5e8c?q=80&w=1974&auto=format&fit=crop', calories: 400,
            instructions: [
                'Sazona las pechugas de pollo con sal, pimienta y pimentón.',
                'Calienta el aceite en una sartén grande a fuego medio-alto. Cocina el pollo por 6-8 minutos por cada lado, hasta que esté dorado y cocido por dentro.',
                'Retira el pollo y en la misma sartén, añade los espárragos y el ajo. Saltea por 3-5 minutos hasta que estén tiernos pero crujientes.',
                'Exprime el jugo de limón sobre los espárragos antes de servir junto al pollo.'
            ],
            benefits: 'Proteína magra de alta calidad para el desarrollo y mantenimiento muscular, combinado con la fibra y vitaminas de los espárragos.'
        },
        { id: 5, title: 'Tacos de Lentejas y Champiñones', time: 30, objetivo: 'perder-grasa', ingredients: [
             '1 taza de lentejas cocidas', '200g de champiñones picados', '1/2 cebolla picada', '2 dientes de ajo picados', '1 cda de comino en polvo', '8 tortillas de maíz pequeñas', 'Cilantro, aguacate y lima para servir'
            ], img: 'https://images.unsplash.com/photo-1627907222146-239ade1c2a0a?q=80&w=1974&auto=format&fit=crop', calories: 380,
            instructions: [
                'En una sartén, saltea la cebolla y el ajo hasta que estén fragantes.',
                'Añade los champiñones y cocina hasta que suelten su agua y se doren.',
                'Incorpora las lentejas cocidas y el comino. Cocina por 5 minutos más, machacando algunas lentejas para crear una textura más compacta.',
                'Calienta las tortillas y rellena con la mezcla de lentejas.',
                'Sirve con cilantro fresco, aguacate en cubos y un chorrito de jugo de lima.'
            ],
            benefits: 'Una opción vegana rica en fibra y proteína vegetal, que promueve la saciedad y ayuda a mantener estables los niveles de azúcar en sangre.'
        },
         { id: 6, title: 'Avena Nocturna con Frutos Rojos', time: 5, objetivo: 'aumentar-masa', ingredients: [
            '1/2 taza de avena en hojuelas', '1/2 taza de leche', '1/4 taza de yogur griego', '1 cda de semillas de chía', '1 cda de miel o sirope de arce', '1/2 taza de frutos rojos mixtos'
            ], img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790774?q=80&w=2070&auto=format&fit=crop', calories: 420,
            instructions: [
                'En un frasco o recipiente con tapa, mezcla la avena, leche, yogur, chía y miel.',
                'Tapa y agita bien hasta que todo esté combinado.',
                'Incorpora la mitad de los frutos rojos.',
                'Refrigera durante al menos 4 horas o toda la noche.',
                'Antes de servir, decora con el resto de los frutos rojos.'
            ],
            benefits: 'Carbohidratos complejos para energía sostenida y proteína del yogur y la chía. Perfecto para un desayuno rápido que te mantendrá lleno toda la mañana.'
        },
    ];
    
    // Se seleccionan los elementos del DOM con los que vamos a trabajar.
    const gallery = document.getElementById('recipe-gallery');
    const filterObjetivo = document.getElementById('filter-objetivo');
    const filterTiempo = document.getElementById('filter-tiempo');
    const filterIngrediente = document.getElementById('filter-ingrediente');
    const modalContainer = document.getElementById('recipe-modal-container');

    // Función que crea el HTML para una tarjeta de receta.
    const generateRecipeCard = (recipe) => `
        <div class="surface rounded-2xl shadow-lg overflow-hidden recipe-card fade-in">
            <img src="${recipe.img}" alt="${recipe.title}" class="w-full h-56 object-cover">
            <div class="p-6 flex flex-col h-full">
                <h3 class="text-xl font-bold text-primary flex-grow">${recipe.title}</h3>
                <div class="flex justify-between items-center text-secondary mt-4">
                    <span><svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${recipe.time} min</span>
                    <span><svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>${recipe.calories} Kcal</span>
                </div>
                <button class="recipe-open-button w-full mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-all transform hover:scale-105" data-recipe-id="${recipe.id}">Probar esta receta</button>
            </div>
        </div>
    `;
    
    // Función que crea el HTML para la ventana modal de una receta.
    const generateRecipeModal = (recipe) => {
        const url = window.location.href;
        const text = `¡Mira esta receta increíble de NutriSteps: ${recipe.title}!`;
        
        return `
        <div id="recipe-modal" class="modal-overlay">
            <div class="modal-content">
                <img src="${recipe.img}" alt="${recipe.title}" class="w-full h-64 object-cover rounded-t-xl">
                <div class="p-6 md:p-8">
                    <h2 class="text-3xl font-bold text-primary">${recipe.title}</h2>
                    <div class="flex justify-between items-center text-secondary mt-4 border-b dark:border-gray-600 pb-4">
                        <span><svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${recipe.time} min</span>
                        <span><svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>${recipe.calories} Kcal</span>
                        <span class="capitalize font-semibold text-green-500">${recipe.objetivo.replace('-', ' ')}</span>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8 mt-6">
                        <div>
                            <h3 class="text-xl font-bold text-primary mb-3">Ingredientes</h3>
                            <ul class="list-disc list-inside text-secondary space-y-1">
                                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-primary mb-3">Instrucciones</h3>
                            <ol class="list-decimal list-inside text-secondary space-y-2">
                                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-primary mb-3">Beneficios Nutricionales</h3>
                        <p class="text-secondary">${recipe.benefits}</p>
                    </div>
                    
                    <div class="mt-8 pt-6 border-t dark:border-gray-600 text-center">
                         <h4 class="font-semibold text-primary mb-3">¡Comparte esta receta!</h4>
                        <div class="flex justify-center space-x-4">
                             <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-green-500 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}" target="_blank" class="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-green-500 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.58-."/></svg>
                            </a>
                             <a href="https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}" target="_blank" class="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-green-500 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.45l-6.162 1.688a.5.5 0 01-.65-.65zM19.268 14.16c-.347-.175-2.043-1.008-2.36-1.125-.317-.117-.547-.175-.778.175-.231.349-.893 1.125-1.096 1.353-.203.228-.406.258-.753.083-.347-.176-1.464-.543-2.79-1.723-1.036-.918-1.748-2.053-1.947-2.4-.2-.348-.012-.543.163-.718.16-.162.348-.423.522-.636.175-.212.232-.348.348-.583.117-.235.058-.438-.03-.613-.087-.175-.778-1.875-1.066-2.573-.28-.682-.56-.583-.778-.583-.198-.001-.423.001-.637.001s-.583.083-.893.438c-.31.354-1.194 1.164-1.194 2.845s1.222 3.3 1.397 3.528c.175.228 2.413 3.688 5.852 5.16.859.372 1.534.596 2.053.763.712.237 1.364.198 1.88-.118.572-.347 1.804-2.223 2.053-2.4-.248-.176-.522-.283-.778-.483z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <button id="modal-close-button" class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
        `;
    };

    // Abre la ventana modal.
    const openModal = (recipeId) => {
        const recipe = recipes.find(r => r.id === parseInt(recipeId));
        if (recipe && modalContainer) {
            modalContainer.innerHTML = generateRecipeModal(recipe);
            const modal = document.getElementById('recipe-modal');
            if (modal) {
                 setTimeout(() => modal.classList.add('visible'), 10);
            }
        }
    };
    
    // Cierra la ventana modal.
    const closeModal = () => {
        const modal = document.getElementById('recipe-modal');
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.remove(), 300);
        }
    };

    // Delega los eventos de clic al body para manejar la apertura y cierre del modal.
    document.body.addEventListener('click', (e) => {
        const openButton = e.target.closest('.recipe-open-button');
        const closeButton = e.target.closest('#modal-close-button');
        const modalOverlay = e.target; // Check if the click is on the overlay itself

        if (openButton) {
            openModal(openButton.dataset.recipeId);
        }
        
        if (closeButton || (modalOverlay && modalOverlay.id === 'recipe-modal')) {
            closeModal();
        }
    });

    // Función que renderiza (dibuja) las recetas en la galería según los filtros seleccionados.
    const renderRecipes = () => {
        if (!filterObjetivo || !filterTiempo || !filterIngrediente) return; // Salir si los filtros no existen.

        const objetivo = filterObjetivo.value;
        const tiempo = filterTiempo.value;
        const ingrediente = filterIngrediente.value.toLowerCase();

        const filteredRecipes = recipes.filter(r => {
            const matchObjetivo = objetivo === 'all' || r.objetivo === objetivo;
            const matchTiempo = tiempo === 'all' || r.time <= parseInt(tiempo);
            const matchIngrediente = ingrediente === '' || r.ingredients.some(i => typeof i === 'string' && i.toLowerCase().includes(ingrediente));
            return matchObjetivo && matchTiempo && matchIngrediente;
        });
        
        if(gallery){
            gallery.innerHTML = filteredRecipes.map(generateRecipeCard).join('');
            document.querySelectorAll('#recipe-gallery .fade-in').forEach(el => observer.observe(el));
        }
    };
    
    // Añade los eventos a los filtros para que rendericen las recetas de nuevo cuando cambien.
    if(filterObjetivo && filterTiempo && filterIngrediente){
        filterObjetivo.addEventListener('change', renderRecipes);
        filterTiempo.addEventListener('change', renderRecipes);
        filterIngrediente.addEventListener('input', renderRecipes);
    }

    // Renderiza las recetas por primera vez al cargar la página.
    renderRecipes();
    
    // --- QUIZ LOGIC ---
    // Lógica para el test de recomendación de recetas.
    const quizContainer = document.getElementById('quiz-container');
    const quizResetBtn = document.getElementById('quiz-reset');

    if (quizContainer) {
        quizContainer.addEventListener('click', (e) => {
            if(e.target.classList.contains('quiz-answer')) {
                const answer = e.target.dataset.answer;
                const recommendedRecipe = recipes.find(r => r.objetivo === answer);
                const quizQuestion1 = document.getElementById('quiz-question-1');
                const quizResult = document.getElementById('quiz-result');
                const quizResultCard = document.getElementById('quiz-result-card');
                
                if(recommendedRecipe && quizResultCard) {
                     quizResultCard.innerHTML = generateRecipeCard(recommendedRecipe);
                     observer.observe(quizResultCard.querySelector('.fade-in'));
                }
                
                if(quizQuestion1) quizQuestion1.classList.add('hidden');
                if(quizResult) quizResult.classList.remove('hidden');
            }
        });
    }

    if (quizResetBtn) {
        quizResetBtn.addEventListener('click', () => {
            const quizQuestion1 = document.getElementById('quiz-question-1');
            const quizResult = document.getElementById('quiz-result');
            const quizResultCard = document.getElementById('quiz-result-card');

            if(quizResult) quizResult.classList.add('hidden');
            if(quizQuestion1) quizQuestion1.classList.remove('hidden');
            if(quizResultCard) quizResultCard.innerHTML = '';
        });
    }
    
     // --- ACTIVE NAV LINK ON SCROLL ---
    // Resalta el enlace del menú de navegación correspondiente a la sección que se está viendo.
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
         if(section && section.id) navObserver.observe(section);
    });
});
