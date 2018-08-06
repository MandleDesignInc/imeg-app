<?php
/**
 * Created by Justin McDanel
 * Date: 8/5/18
 */

class MyControllerRegions extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    /**
     * Abstract method for routing GET requests without a primary key passed. Must be defined in your derivative
     * controller. Handles fetching of collections of objects.
     *
     * @abstract
     * @return array
     */
  /*  public function getList() {
        return $this->success('', $this->getProjects());
    }

    public function getProjects() {
        $tag = 'default';
        if (isset($_GET['tag'])) $tag = $_GET['tag'];

        $projectIds = $this->modx->getChildIds(28, 1, array('context' => 'web'));
        $projects = array();

        foreach ($projectIds as $id) {

            $tags = $this->getTags($id);

            if (!in_array($tag, $tags['services']) && !in_array($tag, $tags['markets'])) continue;

            array_push($projects, $this->getPartialProject($id));
        }

        $tagData = $this->getSelectedTagData($tag);


        $result = array();
        $result['projects'] = $projects;
        $result['headerImage'] = $tagData['headerImage'];
        $result['tag'] = $tagData['tag'];
        $result['content'] = $tagData['content'];

        return $result;

    }

    public function collection($list = array(), $total = false, $status = null) {

        return parent::collection($list, $total, $status);
    }*/


    public function read($id) {

        if (empty($id)) {
            return $this->failure($this->modx->lexicon('rest.err_field_ns',array(
                'field' => $this->primaryKeyField,
            )));
        }
        /** @var xPDOObject $object */
        $c = $this->getPrimaryKeyCriteria($id);
        $this->object = $this->modx->getObject($this->classKey,$c);
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }


        $objectArray = array();
        $objectArray['region'] = $this->getRegion($id);

        return $this->success('',$objectArray);
    }


    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

    // TODO: review and refactor, this assumes $this refers to the correct project
    public function getRegion($id) {
        $region = array();

        $region['id'] = $id;
        $region['title'] = $this->object->pagetitle;
        //$region['subtitle'] = $this->getTemplateVariable($id, 36, true);
        $region['alias'] = $this->object->alias;
        $region['content'] = $this->object->content;


        return $region;
    }



}
