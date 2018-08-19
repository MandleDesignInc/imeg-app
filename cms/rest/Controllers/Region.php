<?php
/**
 * Created by Justin McDanel
 * Date: 8/12/18
 */

class MyControllerRegion extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $primaryKeyField = 'alias';

    public function read($alias) {
        $alias = $_GET['alias'];
        $this->object = $this->modx->getObject($this->classKey, array('alias' => $alias));
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }
        //$objectArray = $this->object->toArray();
        $objectArray = array();
        $objectArray['page'] =  $this->getCurrentPage();
        $objectArray['headerImage'] = $this->getTemplateVariable($this->object->id, 25);
        $objectArray['subtitle'] = $this->getTemplateVariable($this->object->id, 36);
        $objectArray['news']['headline'] = $this->getTemplateVariable($this->object->id, 84);
        $objectArray['news']['articles'] = json_decode($this->getTemplateVariable($this->object->id, 85));
        $objectArray['projectSpotlightProjects'] = json_decode($this->getTemplateVariable($this->object->id, 81));
        $objectArray['projectSpotlight'] =  $this->getTemplateVariable($this->object->id, 82);
        $objectArray['projectHeadline'] =  $this->getTemplateVariable($this->object->id, 83);
        $objectArray['projects'] =  $this->getProjects($this->object->pagetitle);
        $objectArray['map'] =  $this->getTemplateVariable($this->object->id, 77);
        $objectArray['locations'] = json_decode($this->getTemplateVariable($this->object->id, 78));
        $objectArray['contacts'] = json_decode($this->getTemplateVariable($this->object->id, 79));

        $afterRead = $this->afterRead($objectArray);
        if ($afterRead !== true && $afterRead !== null) {
            return $this->failure($afterRead === false ? $this->errorMessage : $afterRead);
        }

        return $this->success('',$objectArray);
    }

    public function getCurrentPage() {

        $page = array();

        $page['id'] = $this->object->id;
        $page['title'] = $this->object->pagetitle;
        $page['content'] = $this->object->content;

        return $page;
    }

    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

    public function getProjects($tag) {
        $projectIds = $this->modx->getChildIds(28, 1, array('context' => 'web'));
        $projects = array();

        foreach ($projectIds as $id) {

            $tags = $this->getTags($id);

            if (!in_array($tag, $tags['regions'])) continue;

            array_push($projects, $this->getPartialProject($id));
        }

        $result = array();
        $result['project'] = $projects;

        return $result;

    }

    public function getTags($id) {
        $result = array();

        $result['regions'] = explode(',', $this->getTemplateVariable($id, 80));

        return $result;
    }

    public function getPartialProject($id) {
        $page = $this->modx->getObject('modResource', $id);

        $project['id'] = $id;
        $project['title'] = $page->get('pagetitle');
        $project['previewImage'] = $this->getTemplateVariable($id, 31);
        $project['tags'] = $this->getTags($id);
        $project['path'] = str_replace(' ', '-', strtolower($page->get('pagetitle')));

        return $project;
    }
}
