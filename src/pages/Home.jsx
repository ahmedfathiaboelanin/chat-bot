import ProjectsTable from '../components/Ui/ProjectsTable';
import FileUploadModal from '../components/pages/Home/FileUploadModal';

export default function Home() {
  return (
    <main className='h-screen flex gap-5 flex-col p-5 bg-gray-50'>
      <FileUploadModal />
      <ProjectsTable />
    </main>
  )
}