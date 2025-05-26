import Task from "../components/task";

function Todo() {
  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Exemple de tâche</h2>
      <Task
        taskName="Faire les courses"
        taskDescription="Acheter du pain, du lait et des œufs."
        taskStatus={0}
      />
      <Task
        taskName="Coder un composant"
        taskDescription="Créer un composant Task pour la todo list."
        taskStatus={1}
      />
      <Task
        taskName="Déployer l'application"
        taskDescription="Mettre en ligne la version finale sur le serveur."
        taskStatus={2}
      />
    </div>
  );
}

export default Todo;
